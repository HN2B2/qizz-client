import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/auth"
import { UserResponse } from "./types/user"
import { UserRole } from "./types/user/UserResponse"

export const config = {
    matcher: [
        "/",
        "/auth/:path*",
        "/profile/:path*",
        "/quiz/:path*",
        "/bank/:path*",
        "/play/:path*",
    ],
}

export const publicRoutes: string[] = ["/", "/play"]
export const authRoutes = ["/auth/login", "/auth/register"]
export const protectedRoutes = [
    {
        path: "/profile",
        roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.USER],
    },
    {
        path: "/bank",
        roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.USER],
    },
    {
        path: "/quiz",
        roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.USER],
    },
]

export const middleware = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value
    const userData = req.cookies.get("user")?.value
    const decodedUserData: UserResponse =
        userData && JSON.parse(decodeURIComponent(userData.replace(/\+/g, " ")))

    const verifiedToken =
        token &&
        (await verifyAuth(token).catch((error) => {
            console.error(error)
        }))
    if (req.nextUrl.pathname === "/auth/profile") {
        if (!userData) {
            return null
        }
        if (verifiedToken) {
            return NextResponse.json({
                user: decodedUserData,
                token,
            })
        }
    }
    if (
        !req.nextUrl.pathname.startsWith("/play") &&
        decodedUserData?.role === UserRole.GUEST
    ) {
        const response = NextResponse.redirect(new URL("/", req.url))
        response.cookies.set("token", "", { expires: new Date(0) })
        response.cookies.set("user", "", { expires: new Date(0) })
        return response
    }

    if (req.nextUrl.pathname === "/auth/logout") {
        const redirect = req.nextUrl.searchParams.get("r")

        const response = NextResponse.redirect(
            new URL(
                redirect ? `/auth/login?r=${redirect}` : "/auth/login",
                req.url
            )
        )
        response.cookies.set("token", "", { expires: new Date(0) })
        response.cookies.set("user", "", { expires: new Date(0) })
        return response
    }

    const protectedRoute = protectedRoutes.find((route) =>
        req.nextUrl.pathname.startsWith(route.path)
    )
    const isProtectedRoute = !!protectedRoute

    const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

    const isPublicRoute =
        publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
        !isAuthRoute &&
        !isProtectedRoute

    if (isPublicRoute) {
        return NextResponse.next()
    }

    if (isAuthRoute && !verifiedToken) {
        return NextResponse.next()
    } else if (isAuthRoute && verifiedToken) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if (!token) {
        return NextResponse.redirect(
            new URL(` /auth/login?r=${req.nextUrl.pathname}`, req.url)
        )
    }

    if (isProtectedRoute) {
        if (protectedRoute.roles.includes(decodedUserData.role)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(
                new URL(`/auth/logout?r=${req.nextUrl.pathname}`, req.url)
            )
        }
    }

    if (verifiedToken) {
        return NextResponse.next()
    }

    return NextResponse.redirect(
        new URL(`/auth/login?r=${req.nextUrl.pathname}`, req.url)
    )
}

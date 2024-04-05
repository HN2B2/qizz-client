import { UserMetadataResponse } from "@/types/user"
import SockJS from "sockjs-client"
import ky from "ky"
import { Exception } from "@/types/exception"
import { generateHTML, JSONContent } from "@tiptap/react"
import Highlight from "@tiptap/extension-highlight"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Superscript from "@tiptap/extension-superscript"
import SubScript from "@tiptap/extension-subscript"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"

export const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const instance = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:6868/v1",
    credentials: "include",
    hooks: {
        beforeError: [
            async (error) => {
                const { response } = error

                if (response) {
                    const data: Exception = await response.json()
                    error.name = `(${data.status}) ${data.error}`
                    error.message = data.message
                }

                return error
            },
        ],
    },
})

export const getErrorStatusCode = (error: any) => {
    if (error) {
        return parseInt(error.name.split(" ")[0].replace("(", ""))
    } else {
        return 200
    }
}

export const localInstance = ky.create({
    prefixUrl: appUrl,
    credentials: "include",
})

export const getServerErrorNoti = (error: any) => {
    if (error) {
        return error.message
    } else {
        return "Something went wrong"
    }
}

export const socketUrl = () => {
    return new SockJS(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:6868/v1"}/ws`
    )
}

export const extractUserAvatar = (usermetadata: UserMetadataResponse[]) => {
    const avatar = usermetadata?.find((item) => item.key === "avatarUrl")
    return avatar ? avatar.value : ""
}

export const isNameValid = (name: string) => {
    return /^[A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/u.test(
        name
    )
}

export const formatDate = (date: Date | string | null) => {
    if (!date) {
        return ""
    }
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `${d.getMonth() + 1}`.padStart(2, "0")
    const day = `${d.getDate()}`.padStart(2, "0")
    return `${year}-${month}-${day}`
}

export const removeEmpty = (obj: any) => {
    let newObj: any = {}
    Object.keys(obj).forEach((key) => {
        if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key])
        else if (obj[key] !== undefined) newObj[key] = obj[key]
    })
    return newObj
}

export const renderHTML = (json: string) => {
    try {
        const parsedJson: JSONContent = JSON.parse(json)
        return generateHTML(parsedJson, [
            StarterKit,
            Highlight,
            Underline,
            TextAlign,
            Superscript,
            SubScript,
            Image,
            Youtube,
        ])
    } catch (error) {
        return "Error parsing question"
    }
}

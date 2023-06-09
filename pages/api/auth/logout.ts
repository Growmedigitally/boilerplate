import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from "cookie";
import { USER_COOKIE_KEY } from 'src/constants/user';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;

    const jwt = cookies[USER_COOKIE_KEY || ''];
    if (!jwt) {
        return res.json({ message: "Bro you are already not logged in..." });
    } else {
        const serialised = serialize(USER_COOKIE_KEY, null, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialised);
        res.status(200).json({ message: "Successfuly logged out!" });
        return;
    }
}
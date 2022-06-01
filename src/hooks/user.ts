import useSWR from "swr";
import { useEffect } from "react";
import Router from "next/router";

export function useAuthSession() {
    const { data: user } = useSWR("api/session");
    useEffect(() => {
        if (!user) {
            console.log("no user")
        } else {
            console.log("user found")
        }
    }, [user]);
    return user;
}
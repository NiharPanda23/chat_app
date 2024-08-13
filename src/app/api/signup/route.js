import { NextResponse } from "next/server";

export async function GET(request){
    return NextResponse.json({response: "Hello from NEXT.js"},{status: 400});
}
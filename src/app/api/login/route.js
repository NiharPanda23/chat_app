import { NextResponse } from "next/server";
import { connect } from "getstream";
import bcrypt from "bcrypt";
import { StreamChat } from "stream-chat";

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

export async function POST(req, res) {
  try {
    const { userName, password } = await req.json();

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({ name: userName });

    if (!users.length) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const user = users[0];
    const success = await bcrypt.compare(password, user.hashedPassword);

    const token = serverClient.createUserToken(user.id);
    
    if (success) {
      return NextResponse.json(
        { token, fullName: user.fullName, userName: user.name, userId: user.id }, { status: 200 }
    )} else {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error" },{ status: 500 }
    );
  }
}

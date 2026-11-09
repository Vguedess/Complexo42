import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({status:"ok",service:"complexo42",mode:"demo",persistentData:false});
}

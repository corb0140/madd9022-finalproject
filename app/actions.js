"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation';



function parseJwt(token) {
  if (!token) { return; }
  let json = atob(token.split('.')[1]);
  let user = JSON.parse(json);
  return user.id
}


export async function login(response, token) {
  //set the cookie
  console.log("login", token);
  const expires = new Date(Date.now() + 60 * 1000 * 10); //this is the expiration date of the cookie  - 10 minutes
  
  await response.cookies.set("token", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: expires,
  });


}

export async function logout() {
  await cookies().delete("token"); //clear the cookie
}

export async function getSessions() {
  const token = await cookies().get("token");

  console.log(
    "getSession -",
    token?.value,
    token?.value ? "has cookie token" : "no cookie token"
  );

  if (!token) return null;
  revalidatePath("/");
  return token;
}

export async function updateSession(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.log("updateSession - no token cookie");
  }
  if (!token) return;

  const expires = new Date(Date.now() + 60 * 1000 * 10);
  const resp = NextResponse.next();
  resp.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    expires: expires,
  });
  return resp;
}



export async function handleOfferForm(formData) {
  'use server';

  const tokenValue = await cookies().get("token").value;

  //handle the data from MyForm client side component
  console.log(formData);

  const title = formData.get('offerTitle')
  const description = formData.get('offerDescription')
  const image = formData.get('offerImage')
  const ownerID = parseJwt(tokenValue)
  console.log("OWNER ID:", ownerID)


  console.log('IMAGE', image)
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  console.log("BUFFER: ", buffer)


  // //send somewhere new
  // redirect(`...`);
  // //reload the home page at '/'
  // revalidatePath('/');

  try {
    // const resp = await fetch(`${process.env.BASE_URL}/api/offer`);

    const response = await fetch('https://madd9124-finalproject.onrender.com/api/crap', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        images: buffer,
        location: {
          coordinates: [
            45.83,
            78.37,
          ]
        },
        owner: ownerID,
        status: "AVAILABLE"
      })
    })
    
    console.log('Uploaded :', response);

  } catch (error) {
    console.error('Error uploading data:', error);

  }
}
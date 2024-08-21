"use server"

import prisma from "@/lib/db";
import { bcrypt } from "@/lib/utils";


type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

type HandleSubmitResponse = {
  success: boolean;
  error?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
};

export async function registerUser(formData: RegisterFormData): Promise<HandleSubmitResponse> {
  try {
    const {name, email, password, passwordRepeat} = formData

    if (password !== passwordRepeat) {
      throw new Error("Passwords do not match.")
    }

    if (!email.includes('@')) {
      throw new Error("Invalid email address.");
    }

    const normalizedEmail = email.toLowerCase()

    const user: object | null = await prisma.user.findUnique({
      where: {
        email: normalizedEmail
      },
      select: {
        id: true,
        email: true,
      }
    })

    if (user !== null) {
      throw new Error("Email is already in use.")
    }


    bcrypt.hash(password, 10, async function(err: string, hash: string) {
      if (err) {
        console.error(err)
        throw err
      }
      
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hash,
        }
      })

      console.log(newUser)
    })

    

    return {success: true}
  } catch (error) {
    return {success : false, error: (error as Error).message}
  }
}
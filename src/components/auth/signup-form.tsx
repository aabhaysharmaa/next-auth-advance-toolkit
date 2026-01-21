"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { signUpAction } from "@/actions/signup";
import { RegisterSchema } from "@/schemas";
import { Loader2 } from "lucide-react";
import { Error } from "../error";
import { Success } from "../success";
import { CardWrapper } from "./card-wrapper";

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onFormSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      signUpAction(values).then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
    })
  }

  return (
    <CardWrapper headerLabel="Create an account" backButtonLabel="Already have an account?" backButtonHref="/sign-in" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-4">

            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="John doe" type="text" className="focus-visible:ring-0"  {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Johndoe@gmail.com" type="email" className="focus-visible:ring-0"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="*********" type="password" className="focus-visible:ring-0"  {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />
          </div>
          <Error label={error} />
          <Success label={success} />
          <Button type="submit" className="w-full font-semibold">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "SignIn"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";

import { LoginSchema } from "@/schemas";
import { Error } from "../error";
import { Success } from "../success";
import { CardWrapper } from "./card-wrapper";
import { signInAction } from "@/actions/signin";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const SignInform = () => {
  const params = useSearchParams();
  const authError = params.get("error")
  const errorMessage = authError === "OAuthAccountNotLinked" ? "Email is already linked with different account" : ""
  console.log(authError)
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onFormSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signInAction(values).then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
    })
  }

  return (
    <CardWrapper headerLabel="welcome Back" backButtonLabel="Don't have an account?" backButtonHref="/sign-up" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="example@gmail.com" type="email" className="focus-visible:ring-0"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <Error label={error || errorMessage} />
          <Success label={success || ""} />
          <Button type="submit" className="w-full font-semibold">
            {isPending ? <Loader2 className="size-5 animate-spin" /> : "SignIn"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

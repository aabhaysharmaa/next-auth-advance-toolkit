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
import Link from "next/link";

export const SignInform = () => {
  const params = useSearchParams();
  const authError = params.get("error")
  const callbackUrl = params.get("callbackUrl")
  const errorMessage = authError === "OAuthAccountNotLinked" ? "Email is already linked with different Provider" : "";
  const [isTwoFactor, setIsTwoFactor] = useState(false)

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: ""
    }
  })

  const onFormSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      signInAction(values, callbackUrl as string).then((data) => {
        if (data?.error) {
          form.reset()
          setError(data.error)
        }
        if (data?.success) {
          form.reset()
          setSuccess(data.success)
        }
        if (data?.TwoFactor) {
          setIsTwoFactor(true)
        }
      })
    })
  }

  return (
    <CardWrapper headerLabel="welcome Back" backButtonLabel="Don't have an account?" backButtonHref="/sign-up" showSocial={!isTwoFactor}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-6">
            {isTwoFactor && (
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="******" type="password" className="focus-visible:ring-0"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}


            {!isTwoFactor && (
              <>
                <FormField
                  name="email"
                  control={form.control}
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
                <FormField
                  control={form.control}
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
                <Button variant="link" size="sm" type="button" asChild className="p-0 font-normal m-0">
                  <Link href="/auth/reset">Forgot Password?</Link>
                </Button>
              </>
            )}
          </div>

          <Error label={error || errorMessage} />
          <Success label={success as string} />
          <Button type="submit" className="w-full font-semibold">
            {isPending ? <Loader2 className="size-5 animate-spin" /> : "SignIn"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

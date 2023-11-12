"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function ToastDestructive() {
  const { toast } = useToast();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Oopps! You are not signed in!",
            description: "Click Sign In if you want to create a post.",
            action: (
              <ToastAction
                altText="Try again"
                onClick={() => setOpenLoginDialog(true)}
              >
                Sign In
              </ToastAction>
            ),
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
}

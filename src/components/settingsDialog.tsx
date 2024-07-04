"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../components/ui/tooltip";
import { Slider } from "../components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";

const formSchema = z.object({
  model: z.enum(["generic", "text"]),
  temperature: z.number().min(0).max(1),
  topK: z.number().min(1),
});
export const SettingsDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "generic",
      temperature: 0.8,
      topK: 3,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Modal Settings</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-start gap-6"
          >
            <fieldset className="grid gap-6 rounded-lg">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          id="model"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="generic">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div>
                              Gemini Nano{" "}
                              <span className="font-medium text-foreground">
                                Generic
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="text">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div>
                              Gemini Nano{" "}
                              <span className="font-medium text-foreground">
                                Text
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                              <FormLabel>Temperature</FormLabel>
                              <span className="text-right text-sm text-muted-foreground">
                                {field.value}
                              </span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="start"
                          className="w-80"
                        >
                          <p className="m-2">
                            The value is passed through to the provider. <br />
                            The range depends on the provider and model. For
                            most providers, 0 means almost deterministic
                            results, and higher values mean more randomness.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <FormControl>
                      <Slider
                        onValueChange={field.onChange}
                        value={[field.value]}
                        id="temperature"
                        className="hover:cursor-pointer"
                        defaultValue={[0.8]}
                        max={1}
                        min={0}
                        step={0.1}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topK"
                render={({ field }) => (
                  <FormItem>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                              <FormLabel>Top K</FormLabel>
                              <span className="text-right text-sm text-muted-foreground">
                                {field.value}
                              </span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="start"
                          className="w-80"
                        >
                          <p className="m-2">
                            Only sample from the top K options for each
                            subsequent token. <br />
                            Used to remove &quot;long tail&quot; low probability
                            responses. Recommended for advanced use cases only.
                            You usually only need to use temperature.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <FormControl>
                      <Slider
                        id="topK"
                        className="hover:cursor-pointer"
                        onValueChange={field.onChange}
                        value={[field.value]}
                        defaultValue={[3]}
                        max={20}
                        min={1}
                        step={1}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

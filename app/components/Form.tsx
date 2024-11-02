import { useState, useEffect, FormEvent } from "react";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Toaster } from "sonner";
import { toast } from "sonner";

import { CircleCheckSVG, CircleXSVG } from "./ui/icons";

export const Form = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const [isInvalidMessage, setIsInvalidMessage] = useState<boolean>(false);

  useEffect(() => {
    if (name !== "") setIsInvalidName(false);
    if (
      email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    )
      setIsInvalidEmail(false);
    if (message !== "") setIsInvalidMessage(false);
  }, [name, email, message]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") setIsInvalidName(true);
    if (email === "") setIsInvalidEmail(true);
    if (message === "") setIsInvalidMessage(true);

    if (!name || !email || !message) {
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      
      const data = await res.json();
      
      if (data.code === 200) {
        setName('');
        setEmail('');
        setMessage('');
        toast("Email has been sent", {
          className: "my-classname",
          duration: 3000,
          icon: <CircleCheckSVG />,
        });
      } else {
        toast("Email has not been sent", {
          className: "my-classname",
          duration: 3000,
          icon: <CircleXSVG />,
        });
      }
    } catch (error) {
      toast("Email has not been sent", {
        className: "my-classname",
        duration: 3000,
        icon: <CircleXSVG />,
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-3xl font-bold">Contact with me</h2>
      <p className="text-lg text-gray-400">
        You can also get in touch with me through this form below.
      </p>
      <Input
        id="name"
        type="text"
        label="Name"
        placeholder="John Doe"
        isInvalid={isInvalidName}
        value={name}
        onChange={(e) => setName(e.target.value)}
        errorMessage={isInvalidName && "Please enter your name"}
      />
      <Input
        type="email"
        name="email"
        id="email"
        label="Email"
        placeholder="john.doe@example.com"
        isInvalid={isInvalidEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={isInvalidEmail && "Please enter a valid email"}
      />
      <Textarea
        id="message"
        type="text"
        label="Message"
        placeholder="Enter your message here"
        minRows={4}
        isInvalid={isInvalidMessage}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        errorMessage={isInvalidMessage && "Please enter your message"}
      />
      <Button type="submit">Send Message</Button>

      <Toaster theme="dark" />
    </form>
  );
};

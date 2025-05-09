import { Box, Heading , Text } from "@radix-ui/themes";
import React, {  ReactNode } from "react";

interface IGreetingProps {
  name: string;
  children: ReactNode;
}

function Greeting({ name , children }: IGreetingProps) {

  return (
    <Box className="w-full  text-app-gray-medium">
      <Heading className="font-bold text-2xl">Hello {name}</Heading>
      <Text className="text-lg">{children}</Text>
    </Box>
  );
}

export default Greeting;

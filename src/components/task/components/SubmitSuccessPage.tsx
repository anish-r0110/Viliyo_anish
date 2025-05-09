import { Button } from "@radix-ui/themes";
import { useRouter } from "next/router";

export const SubmitSuccessScreen = ({ message = 'Thank You For Completing the survey'}:{ message?:string }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 px-[1.5%]">
      <p>{message}</p>
      <Button
        color="purple"
        variant="solid"
        size="3"
        className="w-20"
        onClick={() => router.back()}
      >
        Ok
      </Button>
    </div>
  );
};

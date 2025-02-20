import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";
import HeaderLogo from "../logo/header.logo";

const AppHeader = () => {
  return (
    <section className="flex items-center justify-between p-6">
      <HeaderLogo />
      <div className="flex gap-4">
        <Button href="/login">Log in</Button>
        <Button href="signup">Sign up</Button>
        <Button href="create">Create form</Button>
      </div>
    </section>
  );
};
export default AppHeader;

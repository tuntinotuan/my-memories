import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";
import HeaderLogo from "../logo/header.logo";

const AppHeader = () => {
  return (
    <section className="flex items-center justify-between p-6">
      <HeaderLogo />
      <div className="flex gap-4">
        <Button href="/login" bgBtn="secondary">
          Log in
        </Button>
        <Button href="signup" bgBtn="secondary">
          Sign up
        </Button>
        <Button href="create" bgBtn="primary">
          Create form
        </Button>
      </div>
    </section>
  );
};
export default AppHeader;

import ClickableImage from "@/app/components/ClickableImage";

export default function CopypasteProject() {
  return (
    <div className="w-full projects-project">
      {" "}
      <h1 className="text-white text-4xl">Copypaste</h1>
      <p className="text-white mt-4 opacity-80">
        A web application that allows users to quickly share text and edit in
        real time between multiple devices. No login is required and only a
        captcha is needed to create or join a session.
      </p>
      <h2 className="text-white mt-2 pacity-80">How it works:</h2>
      <ClickableImage
        customCss="mt-4 h-160"
        alt="Main menu"
        src="/copypaste-project/main-menu.png"
      />
      <p className="text-white mt-4  opacity-80">
        In the main menu the user can either choose if to create a session or
        join an existing one.
      </p>
      <ClickableImage
        customCss="mt-4 h-160"
        alt="ReCaptcha"
        src="/copypaste-project/captcha-verified.png"
      />
      <p className="text-white mt-4 opacity-80">
        To create a session it is REQUIRED to complete the ReCaptcha.
        Furthermore a host can set an additional session password and ReCaptcha
        requirement.
      </p>
      <ClickableImage
        customCss="mt-4 h-160"
        alt="Session"
        src="/copypaste-project/session.png"
      />
      <p className="text-white mt-4  opacity-80">
        Upon creating a session one can write almost anything (there is a limit
        of characters but its quite big)
      </p>
    </div>
  );
}

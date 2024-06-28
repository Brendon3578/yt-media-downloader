import { Button } from "../components/ui/button";
import notFoundImage from "../assets/images/not-found.svg";

export function NotFoundPage() {
  return (
    <section className="text-center flex flex-col items-center gap-4">
      <img
        src={notFoundImage}
        alt="Foto de nenhuma imagem encontrada"
        className="w-[clamp(12rem,25vw,20rem)]"
      />
      {/* <div className="text-sm flex items-center gap-2 text-destructive">
        <TriangleAlert className="size-5" />
        <p className="leading-7 font-bold">404 error</p>
      </div> */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Página não encontrada
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6  max-w-lg">
          Desculpe, mas... Esta página não existe ou está sendo atualizada,
          tente novamente mais tarde.
        </p>
        <Button variant={"outline"} className="rounded-full px-6 mt-4">
          Voltar
        </Button>
      </div>
    </section>
  );
}

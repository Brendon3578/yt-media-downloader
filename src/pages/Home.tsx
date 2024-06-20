import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Activity, FileMusic, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function HomePage() {
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
  );
  const selectData = [
    {
      id: "music-format",
      icon: FileMusic,
      placeholder: "Formato personalizado",
      label: "Formato de música",
      items: ["MP3", "MP4", "WEBM"],
    },
    {
      id: "bit-rate",
      icon: Activity,
      placeholder: "Taxa de bits personalizado",
      label: "Taxa de bits",
      items: ["128 kbps", "160 kbps", "192 kbps"],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="mx-auto scroll-m-20 border-b pb-2 text-3xl md:text-4xl font-extrabold tracking-tight first:mt-0">
        Baixe músicas ou vídeos do&nbsp;
        <span className="text-primary">YouTube</span>
      </h2>

      <p className="leading-7 ">
        Digite o link do vídeo ou da música, no campo abaixo, e clique no botão
        para baixar a música no formato em que desejar
      </p>

      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="text">Link da música ou vídeo do YouTube</Label>
          <div className="flex w-full items-center">
            <Input
              type="text"
              id="url"
              placeholder="Insira a URL do YouTube"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-r-none border-r-0 z-10"
            />
            <Button
              size="icon"
              variant="outline"
              className="min-w-10 rounded-none"
            >
              <Search className="size-4" />
            </Button>

            <Button className="rounded-l-none">Baixar MP3</Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 max-w-[600px]">
          {selectData.map((select) => (
            <Select key={select.id}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <select.icon className="inline-block size-4" />
                  <SelectValue placeholder={select.placeholder} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{select.label}</SelectLabel>
                  {select.items.map((item) => (
                    <SelectItem
                      value={item.toLowerCase()}
                      key={`${item}-${select.id}`}
                      children={item}
                    />
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ))}
        </div>
      </section>
    </div>
  );
}

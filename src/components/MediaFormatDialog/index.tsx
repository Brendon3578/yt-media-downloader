import { ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Activity, FileMusic } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Button } from "../ui/button";
import { Label } from "../ui/label";

type MediaFormatDialogProps = {
  children: ReactNode;
};

export function MediaFormatDialog({ children }: MediaFormatDialogProps) {
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Baixar em formato personalizado</DialogTitle>
          <DialogDescription>
            Selecione abaixo as configurações, para baixar o áudio em um formato
            personalizado
          </DialogDescription>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 py-4 max-w-[600px]">
              {selectData.map((select) => (
                <div className="flex flex-col gap-2" key={select.id}>
                  <Label>Selecionar {select.label.toLowerCase()}</Label>
                  <Select>
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
                </div>
              ))}
            </div>
            <DialogFooter className="space-y-reverse space-y-2 sm:space-y-0">
              <Button>Baixar MP3</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

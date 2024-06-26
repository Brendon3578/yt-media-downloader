import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { DownloadMediaParams } from "../../interfaces/downloadMediaParams";

type MediaFormatDialogProps = {
  children: ReactNode;
  downloadMediaHandler: (params: Omit<DownloadMediaParams, "url">) => void;
};

const schema = z.object({
  format: z.string().min(1, {
    message: "Formato é obrigatório",
  }),
  bitrate: z.string().min(1, {
    message: "Taxa de bits é obrigatória",
  }),
  addThumbnail: z.boolean(),
  addMetadata: z.boolean(),
});

type CustomDownloadFormatSchema = z.infer<typeof schema>;

const BITRATE_SELECT_DATA = [128, 160, 192];
const FORMAT_SELECT_DATA = ["MP3", "MP4", "WEBM"];

export function MediaFormatDialog({
  children,
  downloadMediaHandler,
}: MediaFormatDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<CustomDownloadFormatSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      format: "mp3",
      bitrate: "128",
      addThumbnail: false,
      addMetadata: false,
    },
  });

  console.log("aa");
  const onSubmit = ({
    addMetadata,
    addThumbnail,
    ...data
  }: CustomDownloadFormatSchema) => {
    if (!form.formState.isDirty && form.formState.isSubmitted) {
      console.log(data);
    }
    downloadMediaHandler({
      fileSize: 1024 * 1024 * 10,
      extension: data.format,
      audioBitrate: +data.bitrate,
      mediaType: "audio",
      addMetadata,
      addThumbnail,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Baixar em formato personalizado</DialogTitle>
          <DialogDescription>
            Selecione abaixo as configurações, para baixar o áudio em um formato
            personalizado
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4 py-4 max-w-[600px]">
                {/* Formato */}
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel>Formato de música</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={FORMAT_SELECT_DATA[0].toLowerCase()}
                      >
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <FileMusic className="inline-block size-4" />
                            <SelectValue placeholder="Formato personalizado" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {FORMAT_SELECT_DATA.map((item) => (
                              <SelectItem
                                value={item.toLowerCase()}
                                key={`select-${item}`}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Taxa de bits */}
                <FormField
                  control={form.control}
                  name="bitrate"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel>Taxa de bits</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={BITRATE_SELECT_DATA[0].toString()}
                      >
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <Activity className="inline-block size-4" />
                            <SelectValue placeholder="Taxa de bits" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {BITRATE_SELECT_DATA.map((item) => (
                              <SelectItem
                                value={item.toString()}
                                key={`select-${item}`}
                              >
                                {item} kbps
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Incluir Thumbnail */}
                <FormField
                  control={form.control}
                  name="addThumbnail"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="">
                        Incluir thumbnail no áudio (capa de álbum)
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Incluir Metadata */}
                <FormField
                  control={form.control}
                  name="addMetadata"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Incluir título e autor da música</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="space-y-reverse space-y-2 sm:space-y-0">
                <Button type="submit">Baixar MP3</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancelar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

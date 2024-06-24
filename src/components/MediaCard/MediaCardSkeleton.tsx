import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function MediaCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-full max-w-lg" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-28" />

          <Skeleton className="h-5 w-12 self-end rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="flex gap-8 flex-col md:flex-row">
        {/* img skeleton */}
        <div className="w-full max-w-[340px]">
          <Skeleton className="w-full h-full min-h-40 rounded-lg" />
        </div>
        <div className="w-full">
          <div>
            <Skeleton className="w-48 h-8" />
          </div>

          <Table className="mt-2">
            <TableHeader>
              <TableRow>
                <TableHead>Resolução</TableHead>
                <TableHead>Informações do Arquivo</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 px-4 py-2" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

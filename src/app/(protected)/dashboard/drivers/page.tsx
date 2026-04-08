'use client';

import UpdateDriversForm from '@/components/admin/drivers/edit-drivers-form';
import RegisterDriversForm from '@/components/admin/drivers/register-drivers-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDeleteDriver } from '@/hooks/drivers/use-delete-driver.hooks';
import { useDrivers } from '@/hooks/drivers/use-driver-details.hooks';
import { useParkingSlots } from '@/hooks/parking/use-parking-slots.hooks';
import { Search, TriangleAlert } from 'lucide-react';
import { useState } from 'react';

const ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 8;

export default function AllDriversPage() {
  const { drivers, loading } = useDrivers();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { slots } = useParkingSlots();
  const { handleDeleteDriver, deleting, isOpen, setIsOpen } = useDeleteDriver();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  async function onConfirmDelete(driver: (typeof drivers)[0]) {
    if (!driver) return;
    await handleDeleteDriver(driver.rfidTag || '', driver.driverName);
  }

  function onUpdateDriver(driver: (typeof drivers)[0]) {
    if (!driver) return;
    setSelectedDriver(driver);
  }

  const filtered = drivers.filter((d) => {
    const searchValue = search?.toLowerCase() || '';
    const driverName = d.driverName?.toLowerCase() || '';
    const plateNumber = d.plateNumber?.toLowerCase() || '';
    return (
      driverName.includes(searchValue) || plateNumber.includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function getPageNumbers(): (number | 'ellipsis')[] {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const siblingsEachSide = 2;
    const leftSibling = Math.max(safePage - siblingsEachSide, 2);
    const rightSibling = Math.min(safePage + siblingsEachSide, totalPages - 1);

    pages.push(1);
    if (leftSibling > 2) pages.push('ellipsis');
    else for (let i = 2; i < leftSibling; i++) pages.push(i);

    for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);

    if (rightSibling < totalPages - 1) pages.push('ellipsis');
    else for (let i = rightSibling + 1; i < totalPages; i++) pages.push(i);

    pages.push(totalPages);
    return pages;
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-black text-gray-900">
          All Registered Drivers
        </h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Manage all drivers registered in the A.P.P.S. system
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name or plate number"
              className="w-70 rounded-lg px-3 py-2 pl-8 focus-visible:ring-1 focus-visible:ring-green-500"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <RegisterDriversForm />
      </div>

      <Card className="overflow-hidden border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50 hover:bg-green-50">
                <TableHead className="text-xs font-black tracking-wider text-green-700 uppercase">
                  Driver
                </TableHead>
                <TableHead className="text-xs font-black tracking-wider text-green-700 uppercase">
                  Plate No.
                </TableHead>
                <TableHead className="text-xs font-black tracking-wider text-green-700 uppercase">
                  RFID Tag
                </TableHead>
                <TableHead className="text-xs font-black tracking-wider text-green-700 uppercase">
                  Vehicle
                </TableHead>
                <TableHead className="text-xs font-black tracking-wider text-green-700 uppercase">
                  Registered
                </TableHead>
                <TableHead className="text-xs font-black tracking-wider text-green-700 uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-gray-400"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {!loading && filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-gray-400"
                  >
                    No drivers found.
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                paginated.map((driver, index) => (
                  <TableRow
                    key={index}
                    className="relative hover:bg-green-50/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${driver.status === "Student" ? "bg-blue-300" : "bg-purple-300"}`}>
                          👤
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">
                            {driver?.driverName || 'Unknown Driver'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {driver?.contactNumber || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-100 px-2.5 py-1 text-xs font-bold tracking-widest text-green-500"
                      >
                        {driver?.plateNumber || 'N/A'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-semibold text-green-700">
                        {driver?.rfidTag || 'N/A'}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs text-gray-600">
                      {driver?.vehicleModel || 'N/A'}
                    </TableCell>

                    <TableCell className="text-xs text-gray-400">
                      {driver?.registeredAt
                        ? new Date(driver.registeredAt).toLocaleDateString(
                            'en-PH',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )
                        : 'N/A'}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <UpdateDriversForm
                          driver={selectedDriver}
                          onClick={() => onUpdateDriver(driver)}
                        />
                        <AlertDialog
                          open={isOpen}
                          onOpenChange={(isOpen) => setIsOpen(isOpen)}
                        >
                          <AlertDialogTrigger>
                            <Badge
                              variant="outline"
                              className="border-red-200 bg-red-100 text-xs text-red-500 hover:bg-red-100 hover:text-red-700"
                            >
                              Delete
                            </Badge>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="h-56 overflow-hidden rounded-2xl border-gray-100 p-0 shadow-xl">
                            <div className="border-b border-red-100 bg-red-50 px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                                  <TriangleAlert className="h-4 w-4 text-red-500" />
                                </div>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Driver
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete{' '}
                                    <strong>
                                      {driver?.driverName || 'this driver'}
                                    </strong>
                                    ? This will permanently remove their
                                    registration and free their RFID tag.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                              </div>
                            </div>

                            <AlertDialogFooter className="border-t border-gray-100 bg-gray-50 px-6 pt-2">
                              <AlertDialogCancel className="rounded-lg border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-100">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="rounded-lg bg-red-500 px-4 text-xs font-bold transition-transform hover:bg-red-600 active:scale-95"
                                onClick={() => onConfirmDelete(driver)}
                                disabled={deleting}
                              >
                                {deleting ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      {slots.find((s) => s.rfidTag === driver.rfidTag)
                        ?.status === 'occupied' && (
                        <div className="absolute top-0 right-0 mx-2 my-2 h-2 w-2 rounded-full bg-green-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <div className="relative flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
            <div className="absolute text-xs font-semibold text-gray-400">
              Showing{' '}
              <span className="text-gray-600">
                {filtered.length === 0
                  ? 0
                  : (safePage - 1) * ITEMS_PER_PAGE + 1}
                –{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)}
              </span>{' '}
              of <span className="text-gray-600">{filtered.length}</span>{' '}
              drivers
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (safePage > 1) setCurrentPage(safePage - 1);
                      }}
                      className={
                        safePage === 1 ? 'pointer-events-none opacity-50' : ''
                      }
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === safePage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          className={
                            page === safePage
                              ? 'border-green-200 bg-green-50 font-black text-green-700'
                              : ''
                          }
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (safePage < totalPages) setCurrentPage(safePage + 1);
                      }}
                      className={
                        safePage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

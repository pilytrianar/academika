'use client';
import React, { useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MenuItemMUI from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import InputLabel from "@mui/material/InputLabel";
import StatusChip from '../statusChip/statusChip';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

type Student = {
  id: string;
  name: string;
  course: string;
  status: 'Activo' | 'Inactivo' | 'Suspendido';
};

const sampleData: Student[] = [
  { id: '12345', name: 'Andrea Triana', course: 'Noveno A', status: 'Activo' },
  { id: '54321', name: 'José de la Ossa', course: 'Decimo B', status: 'Activo' },
  { id: '09876', name: 'Joan Romero', course: 'Septimo D', status: 'Inactivo' },
  { id: '67890', name: 'Kathe Diaz', course: 'Octavo C', status: 'Suspendido' },
  { id: '441821', name: 'Andres Bohorquez', course: 'Once A', status: 'Activo' },
  { id: '11111', name: 'Estudiante Extra 1', course: 'Once B', status: 'Activo' },
  { id: '22222', name: 'Estudiante Extra 2', course: 'Once C', status: 'Inactivo' },
];

interface Props {
  search?: string;
}

export default function StudentsTable({ search = '' }: Props) {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuRowId, setMenuRowId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sampleData;
    return sampleData.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q)
    );
  }, [search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const currentRows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl(e.currentTarget);
    setMenuRowId(rowId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  return (
    <Paper className='w-full rounded-lg shadow-sm' elevation={1}>
      <TableContainer sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>ID Estudiante</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Curso</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ width: 48 }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {currentRows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link href={`/studentinfo?id=${row.id}`} className=' hover:text-blue-600'>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/studentinfo?id=${row.id}`} className=' hover:text-blue-600'>
                    {row.id}
                  </Link>
                </TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>
                  <StatusChip status={row.status} />
                </TableCell>
                <TableCell align='right'>
                  <IconButton size='small' onClick={e => handleOpenMenu(e, row.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {currentRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align='center' sx={{ py: 6, color: 'text.secondary' }}>
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className='flex items-center justify-between px-4 py-3 border-t'>
        <div className='flex items-center gap-3'>
          <div className='text-sm text-gray-600'>Resultados por página:</div>
          <FormControl size='small' sx={{ minWidth: 80 }}>
            <Select
              value={rowsPerPage}
              onChange={e => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              size='small'
            >
              <MenuItemMUI value={5}>5</MenuItemMUI>
              <MenuItemMUI value={10}>10</MenuItemMUI>
              <MenuItemMUI value={25}>25</MenuItemMUI>
            </Select>
          </FormControl>
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-sm text-gray-600'>
            {filtered.length > 0
              ? `${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, filtered.length)} de ${filtered.length}`
              : '0 de 0'}
          </div>

          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, v) => setPage(v)}
              shape='rounded'
              color='primary'
              size='small'
            />
          </Stack>
        </div>
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>Ver</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Editar</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Eliminar</MenuItem>
      </Menu>
    </Paper>
  );
}

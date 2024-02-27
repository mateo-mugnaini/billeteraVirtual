// Importaciones necesarias
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovements } from "@/redux/actions/movementAction";
import { fetchWalletDetails } from "@/redux/actions/walletAction";
import { useRouter } from "next/navigation";

import styles from "./page.module.css"; // Importa tus estilos CSS
import Navbar from "../components/navbar/navbar";

const ITEMS_PER_PAGE = 5;

const MovementHistory = () => {
  const dispatch = useDispatch();
  const ListMovements = useSelector((state) => state.movement.list);

  const router = useRouter();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const selectedWallet = useSelector((state) => state.wallet.selectedWallet);
  const userId = user?.user?.id;
  const walletId = selectedWallet?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await dispatch(fetchWalletDetails(userId));
        if (walletId) {
          dispatch(fetchMovements(walletId));
        }
      }
    };
    fetchData();
  }, [dispatch, userId, walletId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours} : ${minutes}`;
  };

  // Estado local para la paginación
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMovements = ListMovements.slice(startIndex, endIndex);

  // Estado local para el tipo de movimiento (Ingreso, Egreso o null para mostrar ambos)
  const [movementType, setMovementType] = useState(null);

  // Filtrar movimientos según el tipo seleccionado
  const filteredMovements = ListMovements.filter(
    (movement) => movementType === null || movement.tipo === movementType
  );

  const totalPages = Math.ceil(filteredMovements.length / ITEMS_PER_PAGE);
  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => i + 1
  );

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.ContenedorGeneral}>
      <Navbar />
      <div className={styles.ContenedorGeneral2}>
        <h2 className={styles.Titulo}>Movimientos Recientes</h2>
        <h1 className={styles.saldo}>Saldo Actual: ${selectedWallet?.saldo}</h1>
        <div className={styles.ContenedorGeneral3}>
          <div className={styles.ContenedorFiltros}>
            <button
              className={styles.BtnFilter}
              onClick={() => setMovementType(null)}
            >
              Todos
            </button>
            <button
              className={styles.BtnFilter}
              onClick={() => setMovementType("Ingreso")}
            >
              Ingresos
            </button>
            <button
              className={styles.BtnFilter}
              onClick={() => setMovementType("Egreso")}
            >
              Egresos
            </button>
          </div>
          {filteredMovements === null ? (
            <p>Cargando...</p>
          ) : filteredMovements?.length > 0 ? (
            <>
              <table className={styles.movementsTable}>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Motivo</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovements.map((movement) => (
                    <tr key={movement.id}>
                      <td>{movement.id}</td>
                      <td>{movement.tipo}</td>
                      <td>{movement.monto}</td>
                      <td>{movement.motivo}</td>
                      <td>{formatDate(movement.fecha)}</td>
                      <td>{formatTime(movement.fecha)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <button onClick={goToPrevPage} disabled={currentPage === 1}>
                  Anterior
                </button>
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={
                      pageNumber === currentPage ? styles.activePage : ""
                    }
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <p>No hay movimientos registrados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovementHistory;

"use client"; // Asegúrate de que este sea el primer código en el archivo

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react"; // Importa useEffect y useState
import '../../estilos.css';
import BorrarUsuario from "@/components/borrar";
import EditarUsuario from "@/components/editar";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]); // Inicializa usuarios como un array vacío

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const url = "http://localhost:3000"; // Cambia esto a tu endpoint real
                const response = await axios.get(url);
                setUsuarios(response.data); // Asegúrate de que response.data sea un array
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                setUsuarios([]); // En caso de error, asegúrate de que siga siendo un array
            }
        };

        getUsuarios();
    }, []); // Se ejecuta una vez al montar el componente

    return (
        <div className="container">
            <h1 className="titulo">Usuarios</h1>
            <p className="descripcion">Estas en usuarios</p>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header">Id</th>
                        <th className="table-header">Nombre</th>
                        <th className="table-header">Usuario</th>
                        <th className="table-header">Editar / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(usuarios) && usuarios.length > 0 ? (
                        usuarios.map((usuario, i) => (
                            <tr key={usuario.id}> {/* Usa el id del usuario como key */}
                                <td className="table-data">{i + 1}</td>
                                <td className="table-data">{usuario.nombre}</td>
                                <td className="table-data">{usuario.usuario}</td>
                                <td className="table-data">
                                    <EditarUsuario id={usuario.id} /> / <BorrarUsuario id={usuario.id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="table-data">No hay usuarios disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link href="/usuarios/nuevo" className="link">Agregar Usuario</Link>
        </div>
    );
}
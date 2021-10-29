package ciclo3.doctor.servicios;

import ciclo3.doctor.repositorios.RepositorioReservaciones;
import ciclo3.doctor.entidades.Reservaciones;
import ciclo3.doctor.reportes.ContadorClientes;
import ciclo3.doctor.reportes.StatusReservas;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Comentario que indica que se trata de una clase de servicio. Determina los
 * servicios para gestionar las reservaciones.
 */
@Service
public class ServiciosReservaciones {

    /**
     * Anotación que permite inyectar unas dependencias con otras dentro de
     * Spring.
     */
    @Autowired
    private RepositorioReservaciones metodosCrud;

    /**
     * Servicio que maneja la consulta (READ-GET) de todos los registros en la
     * tabla.
     */
    public List<Reservaciones> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Servicio que maneja la consulta (READ-GET) de un registro en la tabla.
     */
    public Optional<Reservaciones> getReservation(int reservationId) {
        return metodosCrud.getReservation(reservationId);
    }

    /**
     * Servicio que maneja la creación o guardado (CREATE-POST) de nuevos
     * registros en la tabla.
     */
    public Reservaciones save(Reservaciones reservation) {
        if (reservation.getIdReservation() == null) {
            return metodosCrud.save(reservation);
        } else {
            Optional<Reservaciones> reserva = metodosCrud.getReservation(reservation.getIdReservation());
            if (reserva.isEmpty()) {
                return metodosCrud.save(reservation);
            } else {
                return reservation;
            }
        }
    }

    /**
     * Servicio que maneja la actualización (UPDATE-PUT) de registros existentes
     * en la tabla.
     */
    public Reservaciones update(Reservaciones reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservaciones> res = metodosCrud.getReservation(reservation.getIdReservation());
            if (!res.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    res.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    res.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus() != null) {
                    res.get().setStatus(reservation.getStatus());
                }
                return metodosCrud.save(res.get());
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }

    /**
     * Servicio que maneja la eliminación (DELETE) de registros existentes en la
     * tabla.
     */
    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    /**
     * RETO 5
     * 1a consulta
     * @return cuenta de reservas en cada estado
     */
    public StatusReservas getReporteStatusReservaciones() {
        List<Reservaciones> completed = metodosCrud.ReservacionStatus("completed");
        List<Reservaciones> cancelled = metodosCrud.ReservacionStatus("cancelled");
        return new StatusReservas(completed.size(), cancelled.size());
    }

    /**
     * RETO 5
     * 2a consulta
     * @param dateA --> fecha inicial del rango
     * @param dateB --> fecha final del rango
     * @return reserservas en el rango de fechas especificado
     */
    public List<Reservaciones> getReporteTiempoReservaciones(String dateA, String dateB) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date datoUno = new Date();
        Date datoDos = new Date();

        try {
            datoUno = parser.parse(dateA);
            datoDos = parser.parse(dateB);
        } catch (ParseException evt) {
            evt.printStackTrace();
        }
        if (datoUno.before(datoDos)) {
            return metodosCrud.ReservacionTiempo(datoUno, datoDos);
        } else {
            return new ArrayList<>();
        }
    }

    /**
     * RETO 5
     * 3a consulta
     * @return total de reservas por cliente y su detalle
     */
    public List<ContadorClientes> servicioTopClientes() {
        return metodosCrud.getTopClientes();
    }
}

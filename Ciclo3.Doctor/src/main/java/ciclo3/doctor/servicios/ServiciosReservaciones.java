package ciclo3.doctor.servicios;

import ciclo3.doctor.repositorios.RepositorioReservaciones;
import ciclo3.doctor.entidades.Reservaciones;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiciosReservaciones {

    @Autowired
    private RepositorioReservaciones metodosCrud;

    public List<Reservaciones> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Reservaciones> getReservation(int reservationId) {
        return metodosCrud.getReservation(reservationId);
    }

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

    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

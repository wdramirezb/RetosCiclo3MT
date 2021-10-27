package ciclo3.doctor.repositorios;

import ciclo3.doctor.interfaces.InterfaceReservaciones;
import ciclo3.doctor.entidades.Reservaciones;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositorioReservaciones {

    @Autowired
    private InterfaceReservaciones crud;

    public List<Reservaciones> getAll() {
        return (List<Reservaciones>) crud.findAll();
    }

    public Optional<Reservaciones> getReservation(int id) {
        return crud.findById(id);
    }

    public Reservaciones save(Reservaciones reservation) {
        return crud.save(reservation);
    }

    public void delete(Reservaciones reservation) {
        crud.delete(reservation);
    }

}

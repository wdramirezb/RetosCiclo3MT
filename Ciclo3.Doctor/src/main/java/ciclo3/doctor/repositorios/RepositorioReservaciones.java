package ciclo3.doctor.repositorios;

import ciclo3.doctor.entidades.Cliente;
import ciclo3.doctor.interfaces.InterfaceReservaciones;
import ciclo3.doctor.entidades.Reservaciones;
import ciclo3.doctor.reportes.ContadorClientes;
import java.util.ArrayList;
import java.util.Date;
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

    ///RETO 4
    public void delete(Reservaciones reservation) {
        crud.delete(reservation);
    }

    ///RETO 5
    //****1a consulta
    public List<Reservaciones> ReservacionStatus(String status) {
        return crud.findAllByStatus(status);
    }

    //****2a consulta
    public List<Reservaciones> ReservacionTiempo(Date fechaA, Date fechaB) {
        return crud.findAllByStartDateAfterAndStartDateBefore(fechaA, fechaB);
    }

    //****3a consulta
    public List<ContadorClientes> getTopClientes() {
        List<ContadorClientes> res = new ArrayList<>();
        List<Object[]> report = crud.countTotalReservationsByClient();
        for (int i = 0; i < report.size(); i++) {
            res.add(new ContadorClientes((Long) report.get(i)[1], (Cliente) report.get(i)[0]));
        }
        return res;
    }
}

package ciclo3.doctor.controladores;

import ciclo3.doctor.entidades.Reservaciones;
import ciclo3.doctor.reportes.ContadorClientes;
import ciclo3.doctor.reportes.StatusReservas;
import ciclo3.doctor.servicios.ServiciosReservaciones;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ControladorReservaciones {

    @Autowired
    private ServiciosReservaciones servicio;

    @GetMapping("/all")
    public List<Reservaciones> getReservation() {
        return servicio.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservaciones> getReservation(@PathVariable("id") int reservationId) {
        return servicio.getReservation(reservationId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservaciones save(@RequestBody Reservaciones reservation) {
        return servicio.save(reservation);
    }

    ///RETO 4
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservaciones update(@RequestBody Reservaciones reservation) {
        return servicio.update(reservation);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservaciones update(@PathVariable("id") int reservationId, @RequestBody Reservaciones reservation) {
        return servicio.update(reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int reservationId) {
        return servicio.deleteReservation(reservationId);
    }

    ///RETO 5
    //****1a consulta
    @GetMapping("/report-status")
    public StatusReservas getReservas() {
        return servicio.getReporteStatusReservaciones();
    }

    //****2a consulta
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservaciones> getReservasTiempo(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo") String dateTwo) {
        return servicio.getReporteTiempoReservaciones(dateOne, dateTwo);
    }

    //****3a consulta
    @GetMapping("/report-clients")
    public List<ContadorClientes> getClientes() {
        return servicio.servicioTopClientes();
    }
}

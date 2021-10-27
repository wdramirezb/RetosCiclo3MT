package ciclo3.doctor.interfaces;

import ciclo3.doctor.entidades.Reservaciones;
import org.springframework.data.repository.CrudRepository;

public interface InterfaceReservaciones extends CrudRepository<Reservaciones, Integer> {
    
}

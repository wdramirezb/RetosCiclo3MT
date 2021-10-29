package ciclo3.doctor.interfaces;

import ciclo3.doctor.entidades.Reservaciones;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface InterfaceReservaciones extends CrudRepository<Reservaciones, Integer> {

    ///RETO 5
    //****1a consulta
    public List<Reservaciones> findAllByStatus(String status);

    //****2a consulta
    public List<Reservaciones> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);

    //****3a consulta
    @Query("SELECT c.client, COUNT(c.client) FROM Reservaciones AS c GROUP BY c.client ORDER BY COUNT(c.client) DESC")
    public List<Object[]> countTotalReservationsByClient();

}

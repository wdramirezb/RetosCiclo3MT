package ciclo3.doctor.interfaces;

import ciclo3.doctor.entidades.Doctor;
import org.springframework.data.repository.CrudRepository;

public interface InterfaceDoctor extends CrudRepository<Doctor, Integer> {

}

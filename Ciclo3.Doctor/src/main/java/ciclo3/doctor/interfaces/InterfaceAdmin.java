package ciclo3.doctor.interfaces;

import ciclo3.doctor.entidades.Admin;
import org.springframework.data.repository.CrudRepository;

public interface InterfaceAdmin extends CrudRepository<Admin, Integer>{
    
}

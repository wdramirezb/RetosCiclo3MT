package ciclo3.doctor.repositorios;

import ciclo3.doctor.entidades.Doctor;
import ciclo3.doctor.interfaces.InterfaceDoctor;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositorioDoctor {

    @Autowired
    private InterfaceDoctor crud;

    public List<Doctor> getAll() {
        return (List<Doctor>) crud.findAll();
    }

    public Optional<Doctor> getDoctor(int id) {
        return crud.findById(id);
    }

    public Doctor save(Doctor doctor) {
        return crud.save(doctor);
    }

    ///RETO 4
    public void delete(Doctor doctor) {
        crud.delete(doctor);
    }
}

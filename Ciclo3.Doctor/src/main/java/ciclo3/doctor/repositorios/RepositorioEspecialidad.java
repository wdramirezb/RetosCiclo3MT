package ciclo3.doctor.repositorios;

import ciclo3.doctor.entidades.Especialidad;
import ciclo3.doctor.interfaces.InterfaceEspecialidad;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositorioEspecialidad {

    @Autowired
    private InterfaceEspecialidad crud;

    public List<Especialidad> getAll() {
        return (List<Especialidad>) crud.findAll();
    }

    public Optional<Especialidad> getEspecialidad(int id) {
        return crud.findById(id);
    }

    public Especialidad save(Especialidad cspecialidad) {
        return crud.save(cspecialidad);
    }

    ///RETO 4
    public void delete(Especialidad especialidad) {
        crud.delete(especialidad);
    }

}

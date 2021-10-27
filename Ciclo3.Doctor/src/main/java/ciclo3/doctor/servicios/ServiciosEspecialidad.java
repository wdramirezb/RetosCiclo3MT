package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Especialidad;
import ciclo3.doctor.repositorios.RepositorioEspecialidad;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiciosEspecialidad {

    @Autowired
    private RepositorioEspecialidad metodosCrud;

    public List<Especialidad> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Especialidad> getEspecialidad(int EspecialidadId) {
        return metodosCrud.getEspecialidad(EspecialidadId);
    }

    public Especialidad save(Especialidad cspecialidad) {
        if (cspecialidad.getId() == null) {
            return metodosCrud.save(cspecialidad);
        } else {
            Optional<Especialidad> cspecialidad1 = metodosCrud.getEspecialidad(cspecialidad.getId());
            if (cspecialidad1.isEmpty()) {
                return metodosCrud.save(cspecialidad);
            } else {
                return cspecialidad;
            }
        }
    }

    public Especialidad update(Especialidad especialidad) {
        if (especialidad.getId() != null) {
            Optional<Especialidad> esp = metodosCrud.getEspecialidad(especialidad.getId());
            if (!esp.isEmpty()) {
                if (especialidad.getDescription() != null) {
                    esp.get().setDescription(especialidad.getDescription());
                }
                if (especialidad.getName() != null) {
                    esp.get().setName(especialidad.getName());
                }
                return metodosCrud.save(esp.get());
            } else {
                return especialidad;
            }
        } else {
            return especialidad;
        }
    }

    public boolean deletecspecialidad(int cspecialidadId) {
        Boolean d = getEspecialidad(cspecialidadId).map(cspecialidad -> {
            metodosCrud.delete(cspecialidad);
            return true;
        }).orElse(false);
        return d;
    }

}

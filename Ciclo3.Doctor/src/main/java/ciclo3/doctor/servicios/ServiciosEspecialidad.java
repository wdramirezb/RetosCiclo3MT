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

    public Especialidad update(Especialidad cspecialidad) {
        if (cspecialidad.getId() != null) {
            Optional<Especialidad> g = metodosCrud.getEspecialidad(cspecialidad.getId());
            if (!g.isEmpty()) {
                if (cspecialidad.getDescription() != null) {
                    g.get().setDescription(cspecialidad.getDescription());
                }
                if (cspecialidad.getName() != null) {
                    g.get().setName(cspecialidad.getName());
                }
                return metodosCrud.save(g.get());
            }
        }
        return cspecialidad;
    }

    public boolean deletecspecialidad(int cspecialidadId) {
        Boolean d = getEspecialidad(cspecialidadId).map(cspecialidad -> {
            metodosCrud.delete(cspecialidad);
            return true;
        }).orElse(false);
        return d;
    }

}

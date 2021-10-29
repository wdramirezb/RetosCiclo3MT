package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Especialidad;
import ciclo3.doctor.repositorios.RepositorioEspecialidad;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
    
/**
 * Comentario que indica que se trata de una clase de servicio.
 * Determina los servicios para gestionar las especialidades.
 */
@Service
public class ServiciosEspecialidad {

    /**
     * Anotación que permite inyectar unas dependencias con otras dentro de Spring.
     */
    @Autowired
    private RepositorioEspecialidad metodosCrud;
    
    /**
     * Servicio que maneja la consulta (READ-GET) de todos los registros en la tabla. 
     */
    public List<Especialidad> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Servicio que maneja la consulta (READ-GET) de un registro en la tabla. 
     */
    public Optional<Especialidad> getEspecialidad(int EspecialidadId) {
        return metodosCrud.getEspecialidad(EspecialidadId);
    }
    
    /**
     * Servicio que maneja la creación o guardado (CREATE-POST) de nuevos registros en la tabla. 
     */
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
    
    /**
     * Servicio que maneja la actualización (UPDATE-PUT) de registros existentes en la tabla. 
     */
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
    
    /**
     * Servicio que maneja la eliminación (DELETE) de registros existentes en la tabla. 
     */
    public boolean deletecspecialidad(int cspecialidadId) {
        Boolean d = getEspecialidad(cspecialidadId).map(cspecialidad -> {
            metodosCrud.delete(cspecialidad);
            return true;
        }).orElse(false);
        return d;
    }

}

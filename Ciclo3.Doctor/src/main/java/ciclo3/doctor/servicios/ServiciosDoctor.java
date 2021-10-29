package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Doctor;
import ciclo3.doctor.repositorios.RepositorioDoctor;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
    
/**
 * Comentario que indica que se trata de una clase de servicio.
 * Determina los servicios para gestionar los doctores.
 */
@Service
public class ServiciosDoctor {

    /**
     * Anotación que permite inyectar unas dependencias con otras dentro de Spring.
     */
    @Autowired
    private RepositorioDoctor metodosCrud;
    
    /**
     * Servicio que maneja la consulta (READ-GET) de todos los registros en la tabla. 
     */
    public List<Doctor> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Servicio que maneja la consulta (READ-GET) de un registro en la tabla. 
     */
    public Optional<Doctor> getDoctor(int doctorId) {
        return metodosCrud.getDoctor(doctorId);
    }
    
    /**
     * Servicio que maneja la creación o guardado (CREATE-POST) de nuevos registros en la tabla. 
     */
    public Doctor save(Doctor doctor) {
        if (doctor.getId() == null) {
            return metodosCrud.save(doctor);
        } else {
            Optional<Doctor> doc = metodosCrud.getDoctor(doctor.getId());
            if (doc.isEmpty()) {
                return metodosCrud.save(doctor);
            } else {
                return doctor;
            }
        }
    }
    
    /**
     * Servicio que maneja la actualización (UPDATE-PUT) de registros existentes en la tabla. 
     */
    public Doctor update(Doctor doctor) {
        if (doctor.getId() != null) {
            Optional<Doctor> doc = metodosCrud.getDoctor(doctor.getId());
            if (!doc.isEmpty()) {
                if (doctor.getName() != null) {
                    doc.get().setName(doctor.getName());
                }
                if (doctor.getDepartment() != null) {
                    doc.get().setDepartment(doctor.getDepartment());
                }
                if (doctor.getYear() != null) {
                    doc.get().setYear(doctor.getYear());
                }
                if (doctor.getDescription() != null) {
                    doc.get().setDescription(doctor.getDescription());
                }
                if (doctor.getSpecialty() != null) {
                    doc.get().setSpecialty(doctor.getSpecialty());
                }
                return metodosCrud.save(doc.get());
            } else {
                return doctor;
            }
        } else {
            return doctor;
        }
    }
    
    /**
     * Servicio que maneja la eliminación (DELETE) de registros existentes en la tabla. 
     */
    public boolean deleteDoctor(int doctorId) {
        Boolean aBoolean = getDoctor(doctorId).map(doctor -> {
            metodosCrud.delete(doctor);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

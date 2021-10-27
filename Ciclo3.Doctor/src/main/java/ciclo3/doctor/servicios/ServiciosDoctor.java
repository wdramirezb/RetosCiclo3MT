package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Doctor;
import ciclo3.doctor.repositorios.RepositorioDoctor;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiciosDoctor {

    @Autowired
    private RepositorioDoctor metodosCrud;

    public List<Doctor> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Doctor> getDoctor(int doctorId) {
        return metodosCrud.getDoctor(doctorId);
    }

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

    public boolean deleteDoctor(int doctorId) {
        Boolean aBoolean = getDoctor(doctorId).map(doctor -> {
            metodosCrud.delete(doctor);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

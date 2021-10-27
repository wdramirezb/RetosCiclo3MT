package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Admin;
import ciclo3.doctor.repositorios.RepositorioAdmin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiciosAdmin {

    @Autowired
    private RepositorioAdmin metodosCrud;

    public List<Admin> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Admin> getAdmin(int adminId) {
        return metodosCrud.getAdmin(adminId);
    }

    public Admin save(Admin admin) {
        if (admin.getIdAdmin() == null) {
            return metodosCrud.save(admin);
        } else {
            Optional<Admin> adm = metodosCrud.getAdmin(admin.getIdAdmin());
            if (adm.isEmpty()) {
                return metodosCrud.save(admin);
            } else {
                return admin;
            }
        }
    }

    public Admin update(Admin admin) {
        if (admin.getIdAdmin() != null) {
            Optional<Admin> adm = metodosCrud.getAdmin(admin.getIdAdmin());
            if (!adm.isEmpty()) {
                if (admin.getName() != null) {
                    adm.get().setName(admin.getName());
                }
                if (admin.getPassword() != null) {
                    adm.get().setPassword(admin.getPassword());
                }
                return metodosCrud.save(adm.get());
            } else {
                return admin;
            }
        } else {
            return admin;
        }
    }

    public boolean deleteAdmin(int adminId) {
        Boolean aBoolean = getAdmin(adminId).map(admin -> {
            metodosCrud.delete(admin);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

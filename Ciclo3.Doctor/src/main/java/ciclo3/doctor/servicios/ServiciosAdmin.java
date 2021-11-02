package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Admin;
import ciclo3.doctor.repositorios.RepositorioAdmin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
    
/**
 * Comentario que indica que se trata de una clase de servicio.
 * Determina los servicios para gestionar los usuarios admiistradores.
 */
@Service
public class ServiciosAdmin {

    /**
     * Anotación que permite inyectar unas dependencias con otras dentro de Spring.
     */
    @Autowired
    private RepositorioAdmin metodosCrud;
    
    /**
     * Servicio que maneja la consulta (READ-GET) de todos los registros en la tabla. 
     */
    public List<Admin> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Servicio que maneja la consulta (READ-GET) de un registro en la tabla. 
     */
    public Optional<Admin> getAdmin(int adminId) {
        return metodosCrud.getAdmin(adminId);
    }
    
    /**
     * Servicio que maneja la creación o guardado (CREATE-POST) de nuevos registros en la tabla. 
     */
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
    
    /**
     * Servicio que maneja la actualización (UPDATE-PUT) de registros existentes en la tabla. 
     */
    public Admin update(Admin admin) {
        if (admin.getIdAdmin() != null) {
            Optional<Admin> adm = metodosCrud.getAdmin(admin.getIdAdmin());
            if (!adm.isEmpty()) {
                if (admin.getName() != null) {
                    adm.get().setName(admin.getName());
                }
                if (admin.getEmail() != null) {
                    adm.get().setEmail(admin.getEmail());
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
    
    /**
     * Servicio que maneja la eliminación (DELETE) de registros existentes en la tabla. 
     */
    public boolean deleteAdmin(int adminId) {
        Boolean aBoolean = getAdmin(adminId).map(admin -> {
            metodosCrud.delete(admin);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

package ciclo3.doctor.repositorios;

import ciclo3.doctor.entidades.Admin;
import ciclo3.doctor.interfaces.InterfaceAdmin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositorioAdmin {

    @Autowired
    private InterfaceAdmin crud;

    public List<Admin> getAll() {
        return (List<Admin>) crud.findAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return crud.findById(id);
    }

    public Admin save(Admin admin) {
        return crud.save(admin);
    }

    ///RETO 4
    public void delete(Admin admin) {
        crud.delete(admin);
    }
}

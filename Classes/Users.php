<?php
class Users
{
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../import/config.php';
        $this->db = $db;
    }
    public function checkLogin($login)
    {
        $query = $this->db->prepare("SELECT COUNT(*) as total FROM utilisateurs WHERE login = :login");
        $query->execute(['login' => $login]);
        $result = $query->fetch();
        if ($result['total'] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function addUser($login, $password)
    {
        require_once '../import/config.php';
        $query = $this->db->prepare("INSERT INTO utilisateurs (login, password) VALUES (:login, :password)");
        $query->execute([
            'login' => $login,
            'password' => $password
        ]);
    }
    public function connectUser($login, $password)
    {
        $query = $this->db->prepare("SELECT * FROM utilisateurs WHERE login = :login");
        $query->execute(['login' => $login]);
        $result = $query->fetch();
        if (password_verify($password, $result['password'])) {
            $_SESSION['id'] = $result['id'];
            $_SESSION['login'] = $result['login'];
            return true;
        } else {
            return false;
        }
    }
}
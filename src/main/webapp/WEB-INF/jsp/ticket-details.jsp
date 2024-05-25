<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="ISO-8859-1">
    <title>Détails du Ticket</title>
</head>
<body>
    <h1 th:text="'Détails du Ticket pour ' + ${ticket.serviceDedie}"></h1>
    <p th:text="'Description: ' + ${ticket.description}"></p>
    <a href="/tickets">Retour à la liste des tickets</a>
</body>
</html>
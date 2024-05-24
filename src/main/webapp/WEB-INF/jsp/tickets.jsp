<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="ISO-8859-1">
    <title>Tickets</title>
</head>
<body>
    <h1>Liste des Tickets</h1>
    <ul>
        <li th:each="ticket : ${tickets}">
            <a th:href="@{/tickets/{id}(id=${ticket.id})}" th:text="${ticket.serviceDedie}"></a>
        </li>
    </ul>
    <h2>Créer un Nouveau Ticket</h2>
    <form th:action="@{/tickets}" th:object="${ticket}" method="post">
        <label for="serviceDedie">Service Dédie:</label>
        <input type="text" id="serviceDedie" th:field="*{serviceDedie}" /><br/>
        <label for="description">Description:</label>
        <textarea id="description" th:field="*{description}"></textarea><br/>
        <button type="submit">Créer</button>
    </form>
</body>
</html>
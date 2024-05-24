//package com.projets.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import com.projets.model.Ticket;
//import com.projets.service.TicketService;
//
//@Controller
//@RequestMapping("/tickets")
//public class TicketController {
//	@Autowired
//    private TicketService ticketService;
//
//    @GetMapping
//    public String getAllTickets(Model model) {
//        List<Ticket> tickets = ticketService.getAllTickets();
//        model.addAttribute("tickets", tickets);
//        return "tickets";
//    }
//
//    @GetMapping("/{id}")
//    public String getTicketById(@PathVariable Long id, Model model) {
//        Ticket ticket = ticketService.getTicketById(id);
//        model.addAttribute("ticket", ticket);
//        return "ticket-details";
//    }
//
//    @PostMapping
//    public String createTicket(@ModelAttribute Ticket ticket) {
//        ticketService.createOrUpdateTicket(ticket);
//        return "redirect:/tickets";
//    }
//    // Other methods to update/delete tickets
//}

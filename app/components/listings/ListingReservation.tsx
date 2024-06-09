'use client';
import { useState } from 'react';
import { Range } from 'react-date-range';
import Calendar from '../Inputs/Calendar';
import Button from '../Button';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    const [showModal, setShowModal] = useState(false);

    // Fonction pour gérer le clic sur le bouton de réservation
    const handleReserveClick = () => {
        
        setShowModal(true);// Afficher la modal de paiement
    };

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-sm font-semibold">
                    TND {price}
                </div>
                <div className="font-light text-neutral-600 text-sm">
                    night
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4 text-sm" >
                <Button
                    disabled={disabled}
                    label="Start payment"
                    onClick={handleReserveClick}
                />
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-sm">
                <div>
                    Total
                </div>
                <div>
                     {totalPrice}
                </div>
            </div>

            
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        
                        <PayPalScriptProvider options={{ "clientId": "ARlATXPHqlUdPHl4g-VK8z4hrWls04HwIyGVsjb2LkIH02T8Gbl5xWs3RTDEduKQKxkbyVUhuUPxJnWI" }}>
                            <PayPalButtons
                                style={{ layout: "horizontal" }}
                                createOrder={(_data, actions) => {
                                    
                                    return actions.order.create({
                                        intent:'CAPTURE',
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: totalPrice.toFixed(2), 
                                                    currency_code: "USD"
                                                }
                                            }
                                        ]
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    
                                    if (actions.order) {
                                        const details = await actions.order.capture();
                                        onSubmit();
                                        setShowModal(false);
                                    } else {
                                        console.error('actions.order is undefined');
                                    }
                                    return Promise.resolve();
                                }} 
                            />
                        </PayPalScriptProvider>
                        <button className="mt-4" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListingReservation;
//Utilisation de PayPalScriptProvider et PayPalButtons pour intégrer PayPal comme méthode de paiement.
//Création et Approbation de la Commande PayPal 
